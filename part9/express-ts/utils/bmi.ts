export const calculateBMI = (height: number, weight: number): string => {
    const bmi = weight / (height * height);
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi < 25) {
        return "Normal (healthy weight)";
    } else if (bmi < 30) {
        return "Overweight";
    } else {
        return "Obese";
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumber = (value: any): boolean => {
    return !isNaN(Number(value));
};