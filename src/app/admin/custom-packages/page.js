import AdminPackagesList from "../../../components/AdminPackageList";

async function getPackages() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/custom-package`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function AdminPackagesPage() {
  const packages = await getPackages();

  return (
    <div className="container my-5">
      <h1 className="mb-4 fw-bold">All Custom Packages</h1>
      <AdminPackagesList packages={packages} />
    </div>
  );
}
