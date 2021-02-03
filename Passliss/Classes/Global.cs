/*
MIT License

Copyright (c) Léo Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. 
*/
using Passliss.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace Passliss.Classes
{
    /// <summary>
    /// The <see cref="Global"/> class contains various methods and properties.
    /// </summary>
    public static class Global
    {
        /// <summary>
        /// The <see cref="Pages.GeneratePage"/>.
        /// </summary>
        public static Pages.GeneratePage GeneratePage { get; set; }

        /// <summary>
        /// The <see cref="Pages.SettingsPage"/>.
        /// </summary>
        public static Pages.SettingsPage SettingsPage { get; set; }

        /// <summary>
        /// The <see cref="Pages.StrenghtPage"/>.
        /// </summary>
        public static Pages.StrenghtPage StrenghtPage { get; set; }

        /// <summary>
        /// Lower case letters.
        /// </summary>
        public static string LowerCaseLetters { get => "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z"; }

        /// <summary>
        /// Upper case letters.
        /// </summary>
        public static string UpperCaseLetters { get => "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z"; }

        /// <summary>
        /// Numbers.
        /// </summary>
        public static string Numbers { get => "0,1,2,3,4,5,6,7,8,8,9"; }

        /// <summary>
        /// Special caracters.
        /// </summary>
        public static string SpecialCaracters { get => ";,:,!,/,§,ù,*,$,%,µ,£,),=,+,*,-,&,é,',(,-,è,_,ç,<,>,?,^,¨"; }

        /// <summary>
        /// Settings of Passliss.
        /// </summary>
        public static Settings Settings { get; set; }

        /// <summary>
        /// Changes the application's theme.
        /// </summary>
        public static void ChangeTheme()
        {
            ResourceDictionary resourceDictionary = new(); // Create a resource dictionary

            if (Settings.IsDarkTheme) // If the dark theme is on
            {
                resourceDictionary.Source = new Uri("..\\Themes\\Dark.xaml", UriKind.Relative); // Add source
            }
            else
            {
                resourceDictionary.Source = new Uri("..\\Themes\\Light.xaml", UriKind.Relative); // Add source
            }

            App.Current.Resources.MergedDictionaries.Add(resourceDictionary); // Add the dictionary
        }

        /// <summary>
        /// Gets the "Hi" sentence message.
        /// </summary>
        public static string GetHiSentence
        { 
            get
            {
                if (DateTime.Now.Hour >= 21 && DateTime.Now.Hour <= 7) // If between 9PM & 7AM
                {
                    return Properties.Resources.GoodNight + ", " + Environment.UserName + "."; // Return the correct value
                }
                else if (DateTime.Now.Hour >= 7 && DateTime.Now.Hour <= 12) // If between 7AM - 12PM
                {
                    return Properties.Resources.Hi + ", " + Environment.UserName + "."; // Return the correct value
                }
                else if (DateTime.Now.Hour >= 12 && DateTime.Now.Hour <= 17) // If between 12PM - 5PM
                {
                    return Properties.Resources.GoodAfternoon + ", " + Environment.UserName + "."; // Return the correct value
                }
                else if (DateTime.Now.Hour >= 17 && DateTime.Now.Hour <= 21) // If between 5PM - 9PM
                {
                    return Properties.Resources.GoodEvening + ", " + Environment.UserName + "."; // Return the correct value
                }
                else
                {
                    return Properties.Resources.Hi + ", " + Environment.UserName + "."; // Return the correct value
                }
            } 
        }

        /// <summary>
        /// Gets the final caracters that will be present in the password.
        /// </summary>
        /// <param name="lC">Include lower cases.</param>
        /// <param name="uC">Include upper cases.</param>
        /// <param name="n">Include numbers.</param>
        /// <param name="sC">Include special caracters.</param>
        /// <returns>A <see cref="string"/> value.</returns>
        public static string GetFinalCaracters(bool lC, bool uC, bool n, bool sC)
        {
            string finalCaracters = "";

            if (lC) // If include lower cases
            {
                finalCaracters += LowerCaseLetters + ","; // Add lower cases
            }

            if (uC) // If include upper cases
            {
                finalCaracters += UpperCaseLetters + ","; // Add upper cases
            }

            if (n) // If include numbers
            {
                finalCaracters += Numbers + ","; // Add numbers
            }

            if (sC) // If include special caracters
            {
                finalCaracters += SpecialCaracters + ","; // Add special caracters
            }

            return finalCaracters; // Return result
        }

        /// <summary>
        /// Gets the password strenght of a password.
        /// </summary>
        /// <param name="password">The password.</param>
        /// <returns>A <see cref="PasswordStrenght"/> enum.</returns>
        public static PasswordStrenght GetPasswordStrenght(string password)
        {
            int lenght = password.Length; // Lenght
            int pswrScore = lenght / 4; // Score

            for (int i = 0; i < Numbers.Length; i++)
            {
                for (int j = 0; j < lenght; j++)
                {
                    pswrScore += password[j].ToString().Contains(Numbers[i]) ? 1 : 0;
                }
            }

            for (int i = 0; i < SpecialCaracters.Length; i++)
            {
                for (int j = 0; j < lenght; j++)
                {
                    pswrScore += password[j].ToString().Contains(SpecialCaracters[i]) ? 2 : 0;
                }
            }

            MessageBox.Show(pswrScore.ToString());

            return PasswordStrenght.Good; // TODO
        }
    }
}
