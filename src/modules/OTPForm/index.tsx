import React, { useEffect, useState, useRef } from "react";
import { Button, OTPInput } from "../../components";
import { handleKeyDown, handleChangeInput, handlePaste } from "./utils";

interface OTPFormProps {
  phone: string;
  otpLength: number;
}

export const OTPForm: React.FC<OTPFormProps> = ({ phone, otpLength }) => {
  const [otp, setOtp] = useState<string[]>([]);
  const [inputsError, setInputsError] = useState<boolean[]>([]);
  const [inputFocused, setInputFocused] = useState<number>(0);
  const [timeToResend, setTimeToResend] = useState<number>(60);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorOTP, setErrorOTP] = useState<boolean>(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setOtp(new Array(otpLength).fill(""));
    setInputsError(new Array(otpLength).fill(false));
  }, [otpLength]);

  useEffect(() => {
    inputRefs.current[inputFocused]?.focus();
  }, [inputFocused]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeToResend((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeToResend]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    handleChangeInput(
      e,
      index,
      otpLength,
      setOtp,
      setInputFocused,
      setInputsError
    );
  };

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    handleKeyDown(
      e,
      index,
      otp,
      otpLength,
      setOtp,
      setInputFocused,
      setInputsError,
      handleSubmit
    );
  };

  const onPaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    handlePaste(e, index, otpLength, setOtp, setInputFocused, setInputsError);
  };

  const handleSubmit = async () => {
    if (otp.some((v) => v === "")) {
      const firstEmptyIndex = otp.findIndex((v) => v === "");
      setInputFocused(firstEmptyIndex);
      setInputsError(otp.map((v) => (v === "" ? true : false)));
      inputRefs.current[firstEmptyIndex]?.focus();
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (otp.join("") === "1234") {
        alert("Código correcto");
        setErrorOTP(false);
      } else {
        alert("Código incorrecto");
        setErrorOTP(true);
        setInputsError(inputsError.map(() => true));
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleResendCode = () => {
    alert("Código reenviado");
    setTimeToResend(60);
  };

  return (
    <section className="flex w-full py-20 px-5 justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col w-full max-w-96 gap-5"
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-xl lg:text-3xl font-medium">
            Te enviamos un SMS
          </h2>
          <p className="text-gray-300">
            Ingresá el código que te enviamos al número{" "}
            <span className="text-nowrap">{phone}</span>
          </p>
        </div>
        <div className="flex justify-center gap-5 py-20">
          {otp.map((value, index) => (
            <OTPInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              value={value}
              onChange={(e) => onChange(e, index)}
              onKeyDown={(e) => onKeyDown(e, index)}
              onPaste={(e) => onPaste(e, index)}
              onClick={() => setInputFocused(index)}
              maxLength={1}
              error={inputsError[index]}
            />
          ))}
        </div>
        <span className="text-red-400 h-10 text-center">
          {errorOTP && "Código incorrecto. Intentalo de nuevo."}
        </span>
        <Button
          text="Continuar"
          isLoading={isLoading}
          disabled={otp.some((v) => v === "")}
        />
        <div>
          {timeToResend > 0 ? (
            <p className="text-center text-gray-300">
              ¿No recibiste el código? Volvé a intentarlo en {timeToResend}{" "}
              segundos
            </p>
          ) : (
            <Button text="Pedir nuevo código" onClick={handleResendCode} />
          )}
        </div>
      </form>
    </section>
  );
};
