const lettersAndNumbers =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const getPasswordStrength = (password: string) => ({
  hasNumber: [...password].some((char) => char >= "0" && char <= "9"),
  hasUppercase: [...password].some((char) => char >= "A" && char <= "Z"),
  hasLowercase: [...password].some((char) => char >= "a" && char <= "z"),
  hasSpecial: [...password].some((char) => !lettersAndNumbers.includes(char)),
});