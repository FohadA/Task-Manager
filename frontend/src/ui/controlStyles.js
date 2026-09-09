


const CONTROL =
  'h-[38px] w-full rounded-field border bg-surface px-3 text-[14px] text-ink outline-none transition-colors duration-150 placeholder:text-ink-300 disabled:cursor-not-allowed disabled:bg-canvas disabled:text-ink-400';

const BORDER_DEFAULT =
  'border-line hover:border-ink-300 focus:border-brand focus:ring-[3px] focus:ring-brand/20';

const BORDER_INVALID = 'border-danger focus:border-danger focus:ring-[3px] focus:ring-danger/15';

const border = (invalid) => (invalid ? BORDER_INVALID : BORDER_DEFAULT);

export const inputClass = (invalid) => `${CONTROL} ${border(invalid)}`;

export const selectClass = (invalid) =>
  `${CONTROL} cursor-pointer appearance-none bg-[length:16px] bg-[right_0.65rem_center] bg-no-repeat pr-9 ${border(invalid)}`;

export const textareaClass = (invalid) =>
  `w-full rounded-field border bg-surface px-3 py-2 text-[14px] leading-relaxed text-ink outline-none transition-colors duration-150 placeholder:text-ink-300 ${border(invalid)}`;


export const selectArrow = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2385858c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
};
