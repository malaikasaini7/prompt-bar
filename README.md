# prompt bar

A small interaction study: the input field of a generative-AI tool, treated like the whole product.

For a generative tool the empty state *is* the onboarding - so the placeholder types itself, deletes, and retypes a new idea; suggestions sit one tap away; the send button confirms with a check instead of navigating away.

Designed and implemented by me - hand-written CSS, vanilla JavaScript, no dependencies, no build step.

## Details worth noticing

- **Human cadence.** Typing speed is jittered (34-94ms), deletion runs ~3 chars per tick like a held backspace, and the ghost pauses 2.2s on a complete thought before clearing.
- **The ghost is not a placeholder attribute.** It's an absolutely-positioned layer under a transparent input, so it can animate, wrap a blinking caret, and vanish the instant the user types.
- **Focus discipline.** The ghost stops typing while the field is focused - the interface never competes with the user.
- **Motion vocabulary.** Ease-out `cubic-bezier(0.16,1,0.3,1)` everywhere, chips stagger in on load, send button scales on press.

## Run it

Open `index.html`. That's it.
