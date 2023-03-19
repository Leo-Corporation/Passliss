import Head from "next/head"

import { Layout } from "@/components/layout"
import { PageContent } from "@/components/page"
import useTranslation from 'next-translate/useTranslation'
import { Shield20Regular } from "@fluentui/react-icons"
import { Input } from "@/components/ui/input"
import { GetPasswordStrength } from "@/lib/password-strength"


export default function StrengthPage() {
    const { t } = useTranslation("common") // default namespace (optional)

    function GetStrength() {
        let specialChars = [';', ':', '!', '/', '§', 'ù', '*', '$', '%', 'µ', '£', ')', '=', '+', '*', '-', '&', 'é', '\'', '(', '-', 'è', '_', 'ç', '<', '>', '?', '^', '¨'];
        let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        let p = document.getElementById("PasswordStrengthTxt");
        let icon = document.getElementById("StrengthIconTxt");

        let uppercaseTxt = document.getElementById("UppercaseTxt");
        let lowercaseTxt = document.getElementById("LowercaseTxt");
        let numberTxt = document.getElementById("NumbersTxt");
        let specialTxt = document.getElementById("SpecialTxt");
        let lengthTxt = document.getElementById("LengthTxt");

        let password: string = (document.getElementById("PasswordTxt") as HTMLInputElement).value;

        // Get the strength of the password and update the UI depending on the result
        switch (GetPasswordStrength(password)) {
            case 0:
                p.innerHTML = t("strength-low");
                icon.innerHTML = "\uF36E";
                icon.style.color = "red"
                break;
            case 1:
                p.innerHTML = t("strength-medium");
                icon.innerHTML = "\uF882";
                icon.style.color = "#FF7B00";
                break;
            case 2:
                p.innerHTML = t("strength-good");
                icon.innerHTML = "\uF299";
                icon.style.color = "#68EA00";
                break;
            case 3:
                p.innerHTML = t("strength-excellent");
                icon.innerHTML = "\uF6EA";
                icon.style.color = "#00BF07";
                break;
            default:
                p.innerHTML = t("enterpwrstrength");
                icon.innerHTML = "\uF4AB";
                icon.style.color = "#FFFFFFA0";
                break;
        }

        // Load the details panel
        let uC = 0; let lC = 0; let n = 0; let sC = 0;

        for (let i = 0; i < password.length; i++) {
            // Check if char is upper case
            if (password[i].toUpperCase() === password[i] && !specialChars.includes(password[i]) && !numbers.includes(password[i])) {
                uC++;
            }
            // Check if char is lower case
            else if (password[i].toLowerCase() === password[i] && !specialChars.includes(password[i]) && !numbers.includes(password[i])) {
                lC++;
            }
            // Check if char is number
            else if (numbers.includes(password[i])) {
                n++
            }
            // Check if char is contained in specialChars
            else if (specialChars.includes(password[i])) {
                sC++;
            }
        }

        uppercaseTxt.innerHTML = uC.toString();
        lowercaseTxt.innerHTML = lC.toString();
        numberTxt.innerHTML = n.toString();
        specialTxt.innerHTML = sC.toString();
        lengthTxt.innerHTML = password.length.toString();

        // Show the password with syntax highlighting 
        let chars = [];
        let passwordStrength = document.getElementById("PasswordContainer");
        passwordStrength.innerHTML = "";

        for (let i = 0; i < password.length; i++) {
            // Check if char is upper case
            if (password[i].toUpperCase() === password[i] && !specialChars.includes(password[i]) && !numbers.includes(password[i])) {
                chars.push("<span class='text-[#FF2929]'>" + password[i] + "</span>");
            }
            // Check if char is lower case
            else if (password[i].toLowerCase() === password[i] && !specialChars.includes(password[i]) && !numbers.includes(password[i])) {
                chars.push("<span class='text-[#3B8AFF]'>" + password[i] + "</span>");
            }
            // Check if char is number
            else if (numbers.includes(password[i])) {
                chars.push("<span class='text-[#007F5F]'>" + password[i] + "</span>");
            }
            // Check if char is contained in specialChars
            else if (specialChars.includes(password[i])) {
                chars.push("<span class='text-[#9F2CF9]'>" + password[i] + "</span>");
            }
        }

        // Display password
        for (let i = 0; i < chars.length; i++) {
            passwordStrength.innerHTML += chars[i];
        }
    }

    return (
        <Layout>
            <Head>
                <title>Passliss</title>
                <meta
                    name="description"
                    content="Passliss is a simple yet modern password generator."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageContent page="strength">
                <div className="flex space-x-2 items-center mb-2">
                    <Shield20Regular primaryFill="#0088FF" className="text-white" />

                    <p className="font-bold ml-2">{t("strength")}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="flex flex-col items-center m-5">
                        <Input placeholder={t("password")} onChange={GetStrength} id="PasswordTxt" />
                        <p className="m-2 icon-f text-6xl" id="StrengthIconTxt"></p>
                        <p className="font-bold text-center" id="PasswordStrengthTxt"></p>
                    </div>
                    <div className="sm:col-start-2 bg-slate-200 dark:bg-slate-800 p-5 rounded-lg m-5">
                        <p className="text-xl font-bold text-center" id="PasswordContainer"></p>
                        <div className="grid grid-cols-2">
                            <p className="text-[#FF2929] font-bold">{t("uppercases")}</p>
                            <p className="text-[#FF2929] font-bold" id="UppercaseTxt">0</p>
                            <p className="text-[#3B8AFF] font-bold">{t("lowercases")}</p>
                            <p className="text-[#3B8AFF] font-bold" id="LowercaseTxt">0</p>
                            <p className="text-[#007F5F] font-bold">{t("nbrs")}</p>
                            <p className="text-[#007F5F] font-bold" id="NumbersTxt">0</p>
                            <p className="text-[#9F2CF9] font-bold">{t("specialchars")}</p>
                            <p className="text-[#9F2CF9] font-bold" id="SpecialTxt">0</p>
                            <p className="font-bold">{t("length")}</p>
                            <p className="font-bold" id="LengthTxt">0</p>
                        </div>
                    </div>
                </div>
            </PageContent>
        </Layout>
    )
}