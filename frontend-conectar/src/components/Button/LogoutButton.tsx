// src/components/LogoutButton.tsx

export default function LogoutButton() {
  //const { logout } = useAuth();

  return (
    <button
      onClick={() => console.log("logout")}
      className="bg-[var(--color-red-dark)] text-white px-4 py-2 rounded hover:opacity-90"
    >
      Sair
    </button>
  );
}
