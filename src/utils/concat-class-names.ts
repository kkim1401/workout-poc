export default function concatClassNames(...args: [string | undefined]) {
  return args.filter(Boolean).join(' ')
}