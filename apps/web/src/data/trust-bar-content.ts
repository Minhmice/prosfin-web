/**
 * Trust Bar Content Data
 * 
 * Data cho phần trust bar hiển thị logos của các đối tác/khách hàng.
 */

export interface TrustBarLogo {
  name: string;
  logo: string;
  url?: string;
}

export interface TrustBarContent {
  title: string;
  logos: TrustBarLogo[];
}

export const trustBarContent: TrustBarContent = {
  title: "Được tin tưởng bởi",
  logos: [
    {
      name: "Client 1",
      logo: "/images/logo-placeholder.svg",
      url: "https://example.com",
    },
    {
      name: "Client 2",
      logo: "/images/logo-placeholder.svg",
      url: "https://example.com",
    },
    {
      name: "Client 3",
      logo: "/images/logo-placeholder.svg",
    },
    {
      name: "Client 4",
      logo: "/images/logo-placeholder.svg",
    },
    {
      name: "Client 5",
      logo: "/images/logo-placeholder.svg",
    },
    {
      name: "Client 6",
      logo: "/images/logo-placeholder.svg",
    },
    {
      name: "Client 7",
      logo: "/images/logo-placeholder.svg",
    },
    {
      name: "Client 8",
      logo: "/images/logo-placeholder.svg",
    },
  ],
};

