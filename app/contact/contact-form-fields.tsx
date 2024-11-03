export function ContactFormFields() {
  return (
    <>
      <div>
        <label htmlFor="subject" className="block mb-2">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          className="w-full p-2 border rounded"
        >
          <option value="">Select a subject</option>
          <option value="support">Support</option>
          <option value="feature">Feature Request</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="w-full p-2 border rounded"
          rows={4}
        ></textarea>
      </div>
    </>
  );
}
