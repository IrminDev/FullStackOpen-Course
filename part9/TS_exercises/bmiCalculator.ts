const calculateBMI = (height: number, weight: number): string => {
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
}

const parse = (args: Array<string>): Array<number> => {
    if (args.length < 4) throw new Error("Not enough arguments");
    const height = Number(args[2]);
    const weight = Number(args[3]);
    if (isNaN(height) || isNaN(weight)) throw new Error("Provided values were not numbers!");
    return [height*0.01, weight];
}

const argumentss = parse(process.argv);

console.log(calculateBMI(argumentss[0], argumentss[1]));
