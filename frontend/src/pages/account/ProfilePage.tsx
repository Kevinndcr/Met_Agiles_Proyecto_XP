import { useEffect, useState, type FormEvent } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getMe, updateMe, changePassword } from "@/services/users.service";
import { useAuthStore } from "@/store/auth.store";
import { login as apiLogin } from "@/services/auth.service";
import type { User } from "@/types/user";

export default function ProfilePage() {
  const { setUser } = useAuthStore();

  // Carga del perfil
  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 60_000,
  });

  const [form, setForm] = useState<Partial<User>>({});
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    if (meQuery.data) {
      const { _id, ...rest } = meQuery.data;
      setForm(rest);
    }
  }, [meQuery.data]);

  const updateProfile = useMutation({
    mutationFn: updateMe,
    onSuccess: (updated) => {
      setUser(updated);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrMsg(null);
    setMsg(null);

    if (!currentPassword) {
      setErrMsg("Debes ingresar tu contraseña actual para guardar cambios.");
      return;
    }
    if (newPassword && newPassword.length < 6) {
      setErrMsg("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      // 1) Verificamos contraseña actual SIN cambiar token: login con email actual
      const emailActual = meQuery.data?.email ?? form.email ?? "";
      await apiLogin({ email: emailActual, password: currentPassword });

      // 2) Actualizamos perfil (nombre, apellido, email, etc.)
      await updateProfile.mutateAsync({
        nombre: form.nombre ?? "",
        apellido: form.apellido ?? "",
        email: form.email ?? "",
        direcciones: form.direcciones ?? [],
      });

      // 3) Si pidió cambio de contraseña, intentamos cambiarla (si el backend lo soporta)
      if (newPassword) {
        const ok = await changePassword({ currentPassword, newPassword });
        if (ok) {
          setMsg("Perfil actualizado y contraseña cambiada.");
          setNewPassword("");
        } else {
          setMsg("Perfil actualizado. El backend no expone cambio de contraseña por API; se omitió ese paso.");
        }
      } else {
        setMsg("Perfil actualizado.");
      }

      // Limpia “contraseña actual” tras confirmar
      setCurrentPassword("");
    } catch (error: any) {
      const server = error?.response?.data?.error;
      setErrMsg(server ?? "No se pudo guardar los cambios. Verifica tu contraseña.");
    }
  };

  if (meQuery.isLoading) return <p>Cargando perfil…</p>;
  if (meQuery.isError) return <p style={{ color: "crimson" }}>No se pudo cargar el perfil.</p>;

  return (
    <div style={{ maxWidth: 520 }}>
      <h1>Mi perfil</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Nombre
          <input
            value={form.nombre ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
          />
        </label>

        <label>
          Apellido
          <input
            value={form.apellido ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, apellido: e.target.value }))}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={form.email ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </label>

        <hr />

        <label>
          Contraseña actual <span style={{ color: "crimson" }}>*</span>
          <input
            type="password"
            placeholder="Ingresa tu contraseña actual"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={updateProfile.isPending}>
          {updateProfile.isPending ? "Guardando…" : "Guardar cambios"}
        </button>

        {errMsg && <p style={{ color: "crimson", whiteSpace: "pre-wrap" }}>{errMsg}</p>}
        {msg && <p style={{ color: "green", whiteSpace: "pre-wrap" }}>{msg}</p>}
      </form>
    </div>
  );
}