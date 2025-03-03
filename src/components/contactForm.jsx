import { useState } from "react";
import useThemeStore from "../store/useThemeStore";
import axios from "axios";
import { motion } from "framer-motion";
import ContactImage from "../assets/images/colleagues-working-together-office.jpg";

const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded-lg font-bold ${className}`} {...props}>
    {children}
  </button>
);

const Checkbox = ({ checked, onChange }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={onChange}
    className="w-5 h-5"
  />
);

const Input = ({ type, value, onChange, className }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    className={`p-2 border rounded-lg w-full ${className}`}
  />
);

const Label = ({ children }) => (
  <label className="block text-sm font-semibold">{children}</label>
);

const ContactForm = () => {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validateEmail = async (email) => {
    if (!email.endsWith("@gmail.com")) {
      return "Email must be a valid Gmail address";
    }
  
    try {
      const domain = email.split("@")[1]; // Extract domain (gmail.com)
      const res = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
      const data = await res.json();
  
      if (data.Answer) {
        return ""; // Valid email (domain has MX records)
      } else {
        return "Email domain is not valid.";
      }
    } catch {
      return "Could not verify email.";
    }
  };
  

  const validateForm = async () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else {
      const emailError = await validateEmail(formData.email);
      if (emailError) newErrors.email = emailError;
    }
    if (!formData.terms)
      newErrors.terms = "You must accept the terms & conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (await validateForm()) {
      setMessage("Form submitted successfully!");
      setFormData({ firstName: "", lastName: "", email: "", terms: false });
    }
    setLoading(false);
  };

  return (
    <div className="py-10">
      <h2 className="text-5xl font-bold mb-8 text-center">Contact Us</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 mx-auto px-6 md:px-10 max-w-7xl gap-10 items-center max-h-[600px]">
        <div>
          <img src={ContactImage} alt="contact" className=" rounded-3xl" />
        </div>
        <motion.div
          className={` p-6 rounded-3xl shadow-lg  ${
            isDark ? "bg-black text-white" : "bg-white text-black"
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>First Name</Label>
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>

            <div>
              <Label>Last Name</Label>
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.terms}
                onChange={(e) =>
                  setFormData({ ...formData, terms: e.target.checked })
                }
              />
              <Label>I accept the terms and conditions</Label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm">{errors.terms}</p>
            )}

            <Button
              type="submit"
              className={`w-full mt-4 cursor-pointer ${
                isDark ? "bg-orange-500" : "bg-black text-white"
              }`}
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
