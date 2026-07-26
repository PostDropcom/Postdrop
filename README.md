[![npm version](https://img.shields.io/npm/v/postdrop.svg)](https://www.npmjs.com/package/postdrop)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Downloads](https://img.shields.io/npm/dm/postdrop.svg)](https://www.npmjs.com/package/postdrop)

Zero-backend form handling for modern web applications.

# PostDrop

> Zero-backend form handling for modern web applications.

PostDrop allows you to submit HTML forms directly to the PostDrop API without writing any backend code. Simply collect your form data, call `submitForm()`, and handle the response.

---

## Installation

```bash
npm install postdrop
```

---

## Quick Start

```javascript
import { submitForm } from "postdrop";

async function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const res = await submitForm({
    publicKey: "YOUR_PUBLIC_KEY",
    formData,
  });

  if (res.success) {
    console.log("Form submitted successfully!");
  } else {
    console.log(res.message);
  }
}
```

---

## API

### `submitForm(options)`

Submits a form to the PostDrop API.

### Parameters

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `publicKey` | `string` | ✅ | Your PostDrop Project Public Key. |
| `formData` | `FormData` | ✅ | A `FormData` object containing all form fields. |

### Example

```javascript
import { submitForm } from "postdrop";

const formData = new FormData(formElement);

const response = await submitForm({
  publicKey: "YOUR_PUBLIC_KEY",
  formData,
});
```

---

## Response

The function always resolves with the following object.

### Success Response

```javascript
{
  success: true,
  status: 201,
  message: "Form submitted successfully."
}
```

### Error Response

```javascript
{
  success: false,
  status: 400,
  message: "Invalid Public Key."
}
```

---

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | `boolean` | Indicates whether the request was successful. |
| `status` | `number` | HTTP status code returned by the server. |
| `message` | `string` | Human-readable message describing the result. |

---

## Handling Responses

A typical implementation looks like this:

```javascript
const res = await submitForm({
  publicKey: "YOUR_PUBLIC_KEY",
  formData,
});

if (res.success) {
  // Form submitted successfully
  console.log(res.message);

  // Reset form
  form.reset();
} else {
  // Handle error
  console.error(res.message);
}
```

---

## Requirements

- Modern browser with `fetch` support.
- A valid PostDrop Project Public Key.
- Form data must be provided as a native `FormData` object.

---

## Example (React)

```jsx
import { submitForm } from "postdrop";

function ContactForm() {
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await submitForm({
      publicKey: "YOUR_PUBLIC_KEY",
      formData,
    });

    if (res.success) {
      alert("Message sent successfully!");
      e.currentTarget.reset();
    } else {
      alert(res.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
      />

      <textarea
        name="message"
        placeholder="Message"
        required
      />

      <button type="submit">
        Send
      </button>
    </form>
  );
}
```

---

## Error Handling

The package does **not throw** for API validation errors.

Instead, check the `success` property:

```javascript
const res = await submitForm({
  publicKey: "YOUR_PUBLIC_KEY",
  formData,
});

if (!res.success) {
  console.error(`Request failed (${res.status})`);
  console.error(res.message);
}
```

---

## TypeScript Support

The package includes TypeScript definitions.

```ts
import { submitForm } from "postdrop";

const response = await submitForm({
  publicKey: "YOUR_PUBLIC_KEY",
  formData,
});

console.log(response.success);
console.log(response.status);
console.log(response.message);
```

---

## Spam Protection (Recommended)

PostDrop supports honeypot spam protection using a hidden field.

Simply add a hidden input named `postdrop_honeypot` to your form.

### React

```jsx
<input
  type="text"
  name="postdrop_honeypot"
  style={{ display: "none" }}
  tabIndex={-1}
  autoComplete="off"
/>
```

Leave this field empty.

Legitimate users will never interact with this field, while many automated bots will fill it in. If a value is detected, PostDrop automatically rejects the submission as spam.

## Documentation

For complete documentation, dashboard setup, and advanced features such as:

- Email Notifications
- Auto Responses
- Spam Protection
- Custom Domains
- Form Entries
- Analytics

visit the official PostDrop documentation.

---

## License

MIT