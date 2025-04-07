import { useState } from 'react';

function Feedback() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, message });
    setSubmitted(true);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        padding: '1rem',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold' }}>
          Share Your Feedback
        </h2>

        {submitted ? (
          <div
            style={{
              textAlign: 'center',
              color: '#2f855a',
              backgroundColor: '#f0fff4',
              padding: '1rem',
              borderRadius: '8px',
              fontWeight: 'bold',
            }}
          >
            🎉 Thank you for your feedback!
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              {[...Array(5)].map((_, i) => {
                const index = i + 1;
                return (
                  <button
                    key={index}
                    type="button"
                    style={{
                      fontSize: '2rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: index <= (hover || rating) ? '#f6ad55' : '#ccc',
                      transition: 'transform 0.2s',
                    }}
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(0)}
                  >
                    ★
                  </button>
                );
              })}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <textarea
                placeholder="Your comments..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows="4"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  resize: 'vertical',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#4299e1',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#3182ce')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#4299e1')}
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Feedback;
