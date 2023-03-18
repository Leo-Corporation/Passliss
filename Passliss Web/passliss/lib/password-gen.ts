export enum PasswordStrength {
    Low,
    Medium,
    Good,
    VeryGood,
    Unknown
}

export function GeneratePassword(lower: boolean, upper: boolean, numbers: boolean, special: boolean, length: number): string {
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nbrs = "01234567889";
    const specialChars = ";:!/§ù*$%µ£)=(+*-&é'(-è_ç<>?^¨";

    let final = "";
    if (lower) final += lowerCaseLetters;
    if (upper) final += upperCaseLetters;
    if (numbers) final += nbrs;
    if (special) final += specialChars;


    let finalPassword = "";
    for (let i = 0; i < length; i++) {
        finalPassword += final[Math.floor(Math.random() * final.length)];
    }
    return finalPassword;
}

export function GeneratePasswordByStrength(strength: PasswordStrength): string {
    switch (strength) {
        case PasswordStrength.Low:
            return GeneratePassword(true, true, false, false, 9);
        case PasswordStrength.Medium:
            return GeneratePassword(true, true, true, false, 12);
        case PasswordStrength.Good:
            return GeneratePassword(true, true, true, false, 19);
        case PasswordStrength.VeryGood:
            return GeneratePassword(true, true, true, true, 20);
        default:
            return GeneratePassword(true, true, false, false, 9);
    }
}