export function IsMinLength(str: string, length: number) {
  return str.length >= length;
}

export function IsContainNumber(str: string) {
  const numberRegex = /\d/;
  return numberRegex.test(str);
}

export function IsContainLowerChar(str: string) {
  const uppercaseRegex = /[a-z]/;
  return uppercaseRegex.test(str);
}

export default function IsValidPassword(str: string, minLength = 8): {
  valid: boolean;
  message: string;
} {
  if (!IsMinLength(str, minLength))
    return {
      valid: false,
      message: `Must be minimum of ${minLength} characters`
    }
  else if (!IsContainLowerChar(str))
    return {
      valid: false,
      message: `Must contain at least 1 alphabet`
    }
  else if (!IsContainNumber(str))
    return {
      valid: false,
      message: `Must contain at least 1 number`
    }
  else 
    return {
      valid: true,
      message: ``
    }
}