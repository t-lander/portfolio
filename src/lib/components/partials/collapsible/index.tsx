import { merge } from "@/lib/utilities/tailwind";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    title: string;
    subtitle?: string;
}

export default function Collapsible({ title, subtitle, children, className, ...props }: Props) {
    return (
        <Disclosure
            as="div"
            className={merge("group rounded border-neutral-800 border mb-4", className)}
            {...props}
        >
            <DisclosureButton className="cursor-pointer w-full grid grid-cols-[1fr_auto] p-8 gap-4">
                <hgroup className="text-start overflow-hidden">
                    <h1 className="text-white font-bold text-2xl truncate">{title}</h1>
                    {subtitle ? <p className="truncate">{subtitle}</p> : null}
                </hgroup>
                <span role="presentation" className="flex items-center gap-2 shrink-0">
                    <span
                        className="center size-8 rounded-full border border-neutral-800 group-hover:border-white group-hover:bg-neutral-900"
                        aria-label="Expand panel"
                    >
                        <ChevronDownIcon
                            aria-hidden={true}
                            className="group-data-open:rotate-180 group-hover:text-white"
                        />
                    </span>
                </span>
            </DisclosureButton>
            <DisclosurePanel className="p-8 border-neutral-800 border-t border-dashed">
                <div role="presentation" className="prose prose-neutral prose-invert max-w-prose">
                    {children}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
