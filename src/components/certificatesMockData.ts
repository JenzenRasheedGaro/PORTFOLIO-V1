// Mock data for certificates from Supabase
export const mockQuery = {
  certificates: [
    {
      id: 1,
      image_url: "/C1.png",
      title: "React Development Certificate",
      description: "Advanced React development certification",
      issued_by: "Tech Academy",
      issued_date: "2024-01-15T00:00:00.000Z",
      created_at: "2024-01-15T10:30:00.000Z"
    },
    {
      id: 2, 
      image_url: "/C2.png",
      title: "JavaScript Fundamentals",
      description: "Complete JavaScript programming certification",
      issued_by: "Code Institute",
      issued_date: "2023-12-10T00:00:00.000Z",
      created_at: "2023-12-10T14:20:00.000Z"
    },
    {
      id: 3,
      image_url: "/C3.png", 
      title: "UI/UX Design Certificate",
      description: "User interface and experience design certification",
      issued_by: "Design Academy",
      issued_date: "2023-11-20T00:00:00.000Z",
      created_at: "2023-11-20T09:15:00.000Z"
    },
    {
      id: 4,
      image_url: "/C4.png",
      title: "Node.js Backend Development",
      description: "Server-side development with Node.js certification",
      issued_by: "Backend Masters",
      issued_date: "2023-10-05T00:00:00.000Z", 
      created_at: "2023-10-05T16:45:00.000Z"
    },
    {
      id: 5,
      image_url: "/C5.png",
      title: "Database Management",
      description: "Database design and management certification",
      issued_by: "Data Institute",
      issued_date: "2023-09-15T00:00:00.000Z",
      created_at: "2023-09-15T11:30:00.000Z"
    },
    {
      id: 6,
      image_url: "/BEST OJT_1.jpg",
      title: "Best OJT Award",
      description: "Outstanding performance during On-the-Job Training",
      issued_by: "Training Institution",
      issued_date: "2024-02-20T00:00:00.000Z",
      created_at: "2024-02-20T14:30:00.000Z"
    },
    {
      id: 7,
      image_url: "/OJT 2_1.jpg",
      title: "OJT Completion Certificate 2",
      description: "Advanced On-the-Job Training completion certificate",
      issued_by: "Professional Training Center",
      issued_date: "2024-03-10T00:00:00.000Z",
      created_at: "2024-03-10T16:20:00.000Z"
    },
    {
      id: 8,
      image_url: "/OJT_1.jpg",
      title: "OJT Completion Certificate 1",
      description: "First phase On-the-Job Training completion",
      issued_by: "Professional Training Center",
      issued_date: "2024-02-28T00:00:00.000Z",
      created_at: "2024-02-28T13:45:00.000Z"
    }
  ]
};

// Certificate data types
export interface CertificateData {
  id: number;
  image_url: string;
  title?: string;
  description?: string;
  issued_by?: string;
  issued_date?: string;
  created_at?: string;
}

// Query types for Supabase responses
export interface CertificateQueryResponse {
  certificates: CertificateData[];
}

// Props types for components
export interface CertificateProps {
  ImgSertif: string;
  title?: string;
  description?: string;
}

export interface CertificateListProps {
  onError?: (error: string) => void;
  onLoading?: (loading: boolean) => void;
}