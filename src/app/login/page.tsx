"use client";
import { useForm } from "react-hook-form";
import styles from "./Form.module.css";
import { useState } from "react";
import { Login } from "../services/LoginUser";
import { redirect, useRouter } from "next/navigation";

type FormValues = {
  email: string;
  password: string;
};

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await Login(data);
      if (response.data.success) {
        router.push("/homepage");
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.modernForm}>
      <div className={styles.formTitle}>Sign Up</div>

      <div className={styles.formBody}>
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <input
              placeholder="Email"
              type="email"
              className={styles.formInput}
              {...register("email", { required: "Email is required" })}
            />
          </div>
          {errors.email && (
            <span style={{ color: "red", fontSize: 12 }}>
              {errors.email.message}
            </span>
          )}
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className={styles.formInput}
              {...register("password", { required: "Password is required" })}
            />
            <button
              className={styles.passwordToggle}
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && (
            <span style={{ color: "red", fontSize: 12 }}>
              {errors.password.message}
            </span>
          )}
        </div>
      </div>

      <button className={styles.submitButton} type="submit">
        <span>Entrar</span>
        <div className={styles.buttonGlow}></div>
      </button>
    </form>
  );
}
