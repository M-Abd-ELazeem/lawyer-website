import { IconBox } from "@/shared/ui";
import { iconRegistry } from "@/shared/ui/icons";
import { contactChannels } from "../model/contact-channels";

/** The three phone / WhatsApp / address cards above the contact form. */
export function ContactInfoCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {contactChannels.map((channel) => {
        const Icon = iconRegistry[channel.icon];
        return (
          <a
            key={channel.title}
            href={channel.href}
            target={channel.external ? "_blank" : undefined}
            rel={channel.external ? "noopener noreferrer" : undefined}
            className="card text-center flex flex-col items-center"
          >
            <IconBox className="mb-4">
              <Icon className="size-5" />
            </IconBox>
            <h3 className="text-c-white font-bold text-lg mb-2">{channel.title}</h3>
            <p className="text-c-foreground text-xs leading-relaxed">{channel.description}</p>
          </a>
        );
      })}
    </div>
  );
}
