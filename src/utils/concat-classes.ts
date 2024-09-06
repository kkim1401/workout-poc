export default function concatClasses(
  ...args: (string | boolean | undefined)[]
) {
  return args.filter((val) => typeof val === 'string').join(' ');
}
