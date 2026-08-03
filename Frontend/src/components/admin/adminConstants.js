export const serviceOptions = [
    "Tax Preparation",
    "Copy & Fax Services",
    "Notary Public",
    "Translation Services",
    "Immigration Services",
    "Insurance Services",
];

export const preparerOptions = [
    "Pierre Polidor",
    "Dalia Pierre",
    "Severe Jacquet",
    "Jean P Cifrant",
    "Ricot Casimir",
];

export const timeOptions = [];

for (let hour = 9; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
        if (hour === 17 && minute > 0) break;

        const period = hour >= 12 ? "PM" : "AM";
        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        const displayMinute = minute.toString().padStart(2, "0");

        timeOptions.push(`${displayHour}:${displayMinute} ${period}`);
    }
}
