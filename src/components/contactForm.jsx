import { useState } from "react";
import useThemeStore from "../store/useThemeStore";
import { motion } from "framer-motion";
import ContactImage from "../assets/images/contact-us-concept-illustration.png";
import emailjs from "@emailjs/browser";

const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded-lg font-bold ${className}`} {...props}>
    {children}
  </button>
);

const Checkbox = ({ checked, onChange }) => (
  <input type="checkbox" checked={checked} onChange={onChange} className="w-5 h-5" />
);

const Input = ({ type, value, onChange, className }) => (
  <input type={type} value={value} onChange={onChange} className={`p-2 border rounded-lg w-full ${className}`} />
);

const Textarea = ({ value, onChange, className }) => (
  <textarea value={value} onChange={onChange} className={`p-2 border rounded-lg w-full h-40 ${className}`} />
);

const Label = ({ children }) => <label className="block text-sm font-semibold">{children}</label>;

const ContactForm = () => {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validateEmail = async (email) => {
    if (!email.endsWith("@gmail.com")) {
      return "Email must be a valid Gmail address.";
    }

    try {
      const apikey ='347926ee21e444c7acaf5429df53fad2';
      const res = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${apikey}&email=${email}`);
      const data = await res.json();
      console.log('datamail',data);
      
      
      if (data.is_valid_format.value && data.deliverability === "DELIVERABLE") {
        return "";
      } else {
        return "This Gmail address does not exist.";
      }
    } catch (error) {
      console.error("Email validation error:", error);
      return "Could not verify email.";
    }
  };

  const validateForm = async () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else {
      const emailError = await validateEmail(formData.email);
      if (emailError) newErrors.email = emailError;
    }
    if (!formData.message) newErrors.message = "Message is required.";
    if (!formData.terms) newErrors.terms = "You must accept the terms & conditions.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
  
    if (await validateForm()) {
      try {
        const recipients = ["rameesta456@gmail.com", "nizarta79@gmail.com"];
  
        const emailPromises = recipients.map((recipient) =>
          emailjs.send(
            "service_447409k", // Your EmailJS service ID
            "template_b2ku3eb", // Your EmailJS template ID
            {
              fullName: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              message: formData.message,
              recipient_email: recipient,
            },
            "qI8zxfCk1DLGkeecf" // Your EmailJS public key
          )
        );
  
        await Promise.all(emailPromises);
  
        setMessage("Form submitted successfully!");
        setFormData({ fullName: "", phone: "", email: "", message: "", terms: false });
      } catch (error) {
        console.error("Error sending emails:", error);
        setMessage("There was an error sending your message. Please try again.");
      }
    }
  
    setLoading(false);
  };
  

  return (
    <div className="py-10">
      <h2 className="text-5xl font-bold mb-8 text-center">Contact Us</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 mx-auto px-6 md:px-10 max-w-7xl gap-10 items-center">
        <div>
          <img src={ContactImage} alt="contact" className="rounded-3xl" />
        </div>
        <motion.div
          className={`p-6 rounded-3xl shadow-lg ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full"
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>

            <div>
              <Label>Phone</Label>
              <Input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <Label>Message</Label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full"
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
              />
              <Label>I accept the terms and conditions</Label>
            </div>
            {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

            <Button
              type="submit"
              className={`w-full mt-4 cursor-pointer ${isDark ? "bg-orange-500" : "bg-black text-white"}`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
          {message && <p className="text-green-500 mt-2">{message}</p>}
        </motion.div>
      </section>
    </div>
  );
};

export default ContactForm;
