let characters = '';

for (let i = 32; i <= 126; i++) {
  characters += String.fromCharCode(i);
}

export const asciiCharacters = characters;
