
import FormLogin from "../../components/FormLogin/FormLogin";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as Message from "../../components/Message/Message";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as AuthService from "../../services/AuthService";
import * as UserService from "../../services/UserService";
import { setUser, updateUser } from "../../redux/Slice/authSlice";
import { jwtDecode } from "jwt-decode";
import logoImg from '../../assets/logo.png' // Ensure you have a logo image in the specified path
const AuthenticationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isRegister, setIsRegister] = useState(false);
    useEffect(() => {
        if (location.state?.message) {
            Message.warning(location.state.message);
        }
    }, [location.state]);
    const mutationAuth = useMutation({
        mutationFn: (data) => {
            if (isRegister) {
                return AuthService.registerUser(data);
            } else {
                return AuthService.loginUser(data);
            }
        },
        onSuccess: async (data) => {
            console.log("data", data);
                Message.success(data?.message);
                if (!isRegister) {
                    if (data?.access_token) {
                        const decode = jwtDecode(data?.access_token);
                        const { id } = decode;
                        dispatch(setUser({ id, access_token: data.access_token }));
                        const role = await getDetailUser(id, data?.access_token);
                        console.log(role);
                        if (role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }
                    }
                    // ✅ Điều hướng theo role
                    
                } else {
                    setIsRegister((prev) => !prev);
                }
            
        },
        onError: (error) => {
            console.log("Error:", error);
            Message.error(error?.response.data.message);
        },
    })
    const { data: dataUser, isPending } = mutationAuth;
    const getDetailUser = async (id, access_token) => {
        const res = await UserService.getUser(id);
        console.log("hihi",res);
        if (res?.status == 200) {
            const { email, name, role, phone } = res.data;
            const user = {
                id,
                access_token,
                email,
                name,
                role,
                phone,
            };
            dispatch(updateUser(user));
            return role;
        }
        return null;
    };
    return (
  // <DefaultLayout>
  <div
    style={{
      background: "linear-gradient(to right, #d1fae5, #a7f3d0)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
    }}
  >
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        maxWidth: "1000px",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Form Login/Register */}
      <div
        style={{
          flex: "1 1 400px",
          padding: "40px",
        }}
      >
        <FormLogin
          isRegister={isRegister}
          setIsRegister={setIsRegister}
          dataUser={dataUser}
          isPending={isPending}
          onSubmit={(data) => {
            mutationAuth.mutate(data);
          }}
        />
      </div>

      {/* Hình ảnh */}
      <div
        style={{
          flex: "1 1 400px",
          backgroundColor: "#f0fdfa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px",
        }}
      >
        <img
          src={logoImg}
          alt="Logo"
          style={{
            width: "100%",
            maxWidth: "360px",
            borderRadius: "12px",
            objectFit: "cover",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
    </div>
  </div>
  // </DefaultLayout>
);
};

export default AuthenticationPage;