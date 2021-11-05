using System;

namespace behavior_app.Models
{
    public static class Utils
    {
        public static string RemoveStartCapitalLetter(this string text){
            return text != null && text.Length > 0 
                ? text.Substring(0,1).ToLower() + text.Substring(1)
                : text;
        }
        public static string AddStartCapitalLetter(this string text){
            return text != null && text.Length > 0 
                ? text.Substring(0,1).ToUpper() + text.Substring(1)
                : text;
        }
        public static bool StartsWithVocal(this string text){
            return text != null && (text.ToLower().StartsWith('a') ||
                text.ToLower().StartsWith('e') ||
                text.ToLower().StartsWith('i') ||
                text.ToLower().StartsWith('o') ||
                text.ToLower().StartsWith('u'));
        }
    }
}