import { useState } from 'react';
import styles from './PetAdoptionForm.module.css';

function PetAdoptionForm({ isDarkMode }) {
  const [formData, setFormData] = useState({ name: '', email: '', petType: '', reason: '' });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/xdkzkbjk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus('Success! We will review your adoption application.');
        setFormData({ name: '', email: '', petType: '', reason: '' });
      } else {
        setSubmitStatus('Failed to submit. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <section className={`${styles.adoptionForm} ${isDarkMode ? styles.darkMode : ''}`}>
      <h2>Adopt a Pet</h2>
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
          Pet Type (e.g., Dog, Cat):
          <input
            type="text"
            name="petType"
            value={formData.petType}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Reason for Adoption:
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit Application</button>
      </form>
      {submitStatus && <p className={`${styles.submitStatus} ${submitStatus.includes('Failed') || submitStatus.includes('error') ? styles.error : ''}`}>{submitStatus}</p>}
    </section>
  );
}

export default PetAdoptionForm;