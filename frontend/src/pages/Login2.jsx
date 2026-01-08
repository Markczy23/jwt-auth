import api from "../api/api";

export default function Login2() {
  const login = async () => {
    // const res = await api.post("/login", {
    //   username: "companyA",
    //   password: "password",
    // });
    // localStorage.setItem("token", res.data.token);
    // window.location.href = "/";

    const res = await api.get("/login", {
      username: "companyA",
      password: "password",
    });
    localStorage.setItem("token", res.data.token);
    window.location.href = "/";
  };

  return (
    <div className="h-screen flex items-center justify-center bg-green-700">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Carbon Trading</h2>
        <button
          onClick={login}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
