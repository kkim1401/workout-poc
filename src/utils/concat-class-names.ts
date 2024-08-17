export default function concatClassNames(
  ...args: (string | boolean | undefined)[]
) {
  return args.filter((val) => typeof val === 'string').join(' ');
}
