// CertificateList.jsx

import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import Certificate from "./Certificate";

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("certificates").select("*");
        if (error) {
          console.error("Error fetching certificates:", error);
          throw error;
        }
        console.log("Supabase data:", data);
        setCertificates(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  console.log("Certificates:", certificates);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {certificates.map((certificate) => (
        <Certificate key={certificate.id} ImgSertif={certificate.image_url} />
      ))}
    </div>
  );
};

export default CertificateList;