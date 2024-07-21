emailjs.init("Z-wQdA1YRbCgUcKn5")

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    if(this.name.value === '' || this.email.value === '' || this.subject.value === '' || this.message.value === '') {
      alert('Please fill out all fields before proceeding.');
      return false;
    }

    //if there is not a space in the name value, alert the user to enter their full name
    if (!this.name.value.includes(' ')) {
      alert('Please enter your full name.');
      return false;
    }

    //if the email value does not follow the email format, alert the user to enter a valid email
    if (!this.email.value.includes('.')) {
      alert('Please enter a valid email address.');
      return false;
    }

    // Get form values
    const formData = {
      name: this.name.value,
      email: this.email.value,
      subject: this.subject.value,
      message: this.message.value
    };
    
    // Send email using EmailJS
    emailjs.send('service_0gkv9kq', 'template_r983vg7', formData)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Your message has been sent successfully!');
      }, function(error) {
        console.log('FAILED...', error);
        alert('There was an error sending your message.');
      });
  });