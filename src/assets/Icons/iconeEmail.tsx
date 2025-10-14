import type { TypeClassIcon } from "../../types/type-class-icon";

export function IconeEmail({ className }: TypeClassIcon){
    return(
          <svg className={className} width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.75 4H20.75C21.85 4 22.75 4.9 22.75 6V18C22.75 19.1 21.85 20 20.75 20H4.75C3.65 20 2.75 19.1 2.75 18V6C2.75 4.9 3.65 4 4.75 4Z" stroke="#194A99" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M22.75 6L12.75 13L2.75 6" stroke="#194A99" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
    )
}