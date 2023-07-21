interface ExerciseValues {
    hours: Array<number>
    target: number;
}

interface Results{
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number
}

const calculateExercises = (hours: Array<number>, target: number): Results => {
    const periodLength = hours.length;
    const trainingDays = hours.filter(h => h > 0).length;
    const average = hours.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;
    const rating = success ? 3 : average >= target - 1 ? 2 : 1;
    const ratingDescription = rating === 3 ? "Great job!" : rating === 2 ? "Not too bad but could be better" : "You should try harder";
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

const parseArguments = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error("Not enough arguments");
    const target = Number(args[2]);
    const hours = args.slice(3).map(h => Number(h));
    if (isNaN(target) || hours.some(h => isNaN(h))) throw new Error("Provided values were not numbers!");
    return {
        hours,
        target
    }
}

const arguments = parseArguments(process.argv);
console.log(calculateExercises(arguments.hours, arguments.target));