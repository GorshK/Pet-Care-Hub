import { useState } from 'react';
import styles from './ContactForm.module.css';

function ContactForm({ isDarkMode }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/xeokozek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus('Success! Thank you for your message.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('Failed to submit. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <section className={`${styles.contactForm} ${isDarkMode ? styles.darkMode : ''}`}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className={styles.formAnimation}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Send</button>
      </form>
      {submitStatus && <p className={`${styles.submitStatus} ${submitStatus.includes('Failed') || submitStatus.includes('error') ? styles.error : ''}`}>{submitStatus}</p>}
    </section>
  );
}

export default ContactForm;