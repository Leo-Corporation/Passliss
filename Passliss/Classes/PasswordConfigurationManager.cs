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
using LeoCorpLibrary;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Passliss.Classes
{
    /// <summary>
    /// Methods for loading and saving <see cref="PasswordConfiguration"/>.
    /// </summary>
    public static class PasswordConfigurationManager
    {
        /// <summary>
        /// Loads <see cref="PasswordConfiguration"/>.
        /// </summary>
        public static void Load()
        {
            string path = Env.AppDataPath + @"\Passliss\PasswordConfigurations.xml"; // The path of the List<PasswordConfiguration> file

            if (File.Exists(path)) // If the file exist
            {
                XmlSerializer xmlSerializer = new XmlSerializer(typeof(List<PasswordConfiguration>)); // XML Serializer
                StreamReader streamReader = new StreamReader(path); // Where the file is going to be read

                Global.PasswordConfigurations = (List<PasswordConfiguration>)xmlSerializer.Deserialize(streamReader); // Read

                streamReader.Dispose();
            }
            else
            {
                Global.PasswordConfigurations = new(); // Create a new List<PasswordConfiguration> file

                Save(); // Save the changes
            }
        }

        /// <summary>
        /// Saves <see cref="PasswordConfiguration"/>.
        /// </summary>
        public static void Save()
        {
            string path = Env.AppDataPath + @"\Passliss\PasswordConfigurations.xml"; // The path of the List<PasswordConfiguration> file

            XmlSerializer xmlSerializer = new XmlSerializer(typeof(List<PasswordConfiguration>)); // Create XML Serializer

            if (!Directory.Exists(Env.AppDataPath + @"\Passliss")) // If the directory doesn't exist
            {
                Directory.CreateDirectory(Env.AppDataPath + @"\Passliss"); // Create the directory
            }

            StreamWriter streamWriter = new StreamWriter(path); // The place where the file is going to be written
            xmlSerializer.Serialize(streamWriter, Global.PasswordConfigurations);

            streamWriter.Dispose();
        }
    }
}
