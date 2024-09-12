import React from "react";

export const handleChangeInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  index: number,
  otpLength: number,
  setOtp: React.Dispatch<React.SetStateAction<string[]>>,
  setInputFocused: React.Dispatch<React.SetStateAction<number>>,
  setInputsError: React.Dispatch<React.SetStateAction<boolean[]>>
) => {
  const { value } = e.target;
  const digit = value.slice(-1);

  if (isNaN(parseInt(digit))) {
    setOtp((prev) => prev.map((v, i) => (i === index ? "" : v)));
    if (index > 0) {
      setInputFocused(index - 1);
    }
    return;
  }

  setOtp((prev) => prev.map((v, i) => (i === index ? digit : v)));
  setInputsError((prev) => prev.map((v, i) => (i === index ? false : v)));
  if (index < otpLength - 1) {
    setInputFocused(index + 1);
  }
};

export const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  index: number,
  otp: string[],
  otpLength: number,
  setOtp: React.Dispatch<React.SetStateAction<string[]>>,
  setInputFocused: React.Dispatch<React.SetStateAction<number>>,
  setInputsError: React.Dispatch<React.SetStateAction<boolean[]>>,
  onSubmit: () => void
) => {
  if (e.key === "Backspace") {
    if (otp[index] === "" && index > 0) {
      e.preventDefault();
      setOtp((prev) => prev.map((v, i) => (i === index - 1 ? "" : v)));
      setInputFocused(index - 1);
    } else {
      setOtp((prev) => prev.map((v, i) => (i === index ? "" : v)));
    }
  }

  if (e.key === "ArrowLeft" && index > 0) {
    e.preventDefault();
    setInputFocused(index - 1);
  }

  if (e.key === "ArrowRight" && index < otpLength - 1) {
    e.preventDefault();
    setInputFocused(index + 1);
  }

  if (e.key === "Enter") {
    onSubmit();
  }

  if (/^[0-9]$/.test(e.key)) {
    e.preventDefault();
    setOtp((prev) => prev.map((v, i) => (i === index ? e.key : v)));
    setInputsError((prev) => prev.map((v, i) => (i === index ? false : v)));
    if (index < otpLength - 1) {
      setInputFocused(index + 1);
    }
  } else {
    e.preventDefault();
  }
};

export const handlePaste = (
  e: React.ClipboardEvent<HTMLInputElement>,
  index: number,
  otpLength: number,
  setOtp: React.Dispatch<React.SetStateAction<string[]>>,
  setInputFocused: React.Dispatch<React.SetStateAction<number>>,
  setInputsError: React.Dispatch<React.SetStateAction<boolean[]>>
) => {
  e.preventDefault();

  const paste = e.clipboardData.getData("text");
  const digits = paste.replace(/\D/g, "");

  setOtp((prevOtp) => {
    const otpCopy = [...prevOtp];
    let currentIndex = index;

    for (let i = 0; i < digits.length; i++) {
      if (currentIndex >= otpLength) break;
      otpCopy[currentIndex] = digits[i];

      currentIndex++;
    }

    setInputFocused(Math.min(currentIndex, otpLength - 1));
    setInputsError(() => otpCopy.map((v) => (v === "" ? true : false)));
    return otpCopy;
  });
};
