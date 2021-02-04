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
using Passliss.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Passliss.Extensions
{
    /// <summary>
    /// Extensions of the <see cref="string"/> type.
    /// </summary>
    public static class StringExtensions
    {
        /// <summary>
        /// Checks if a string contains lower cases.
        /// </summary>
        /// <param name="s"></param>
        /// <returns>A <see cref="bool"/> value.</returns>
        public static bool ContainsLowerCases(this string s)
        {
            string[] lowerCase = Global.LowerCaseLetters.Split(new string[] { "," }, StringSplitOptions.None); // Lower case

            for (int i = 0; i < lowerCase.Length; i++)
            {
                for (int j = 0; j < s.Length; j++)
                {
                    if (s[j].ToString().Contains(lowerCase[i]))
                    {
                        return true; // Return
                    }
                }
            }

            return false; // Return
        }

        /// <summary>
        /// Checks if a string contains upper cases.
        /// </summary>
        /// <param name="s"></param>
        /// <returns>A <see cref="bool"/> value.</returns>
        public static bool ContainsUpperCases(this string s)
        {
            string[] upperCase = Global.UpperCaseLetters.Split(new string[] { "," }, StringSplitOptions.None); // Upper case

            for (int i = 0; i < upperCase.Length; i++)
            {
                for (int j = 0; j < s.Length; j++)
                {
                    if (s[j].ToString().Contains(upperCase[i]))
                    {
                        return true; // Return
                    }
                }
            }

            return false; // Return
        }
    }
}
