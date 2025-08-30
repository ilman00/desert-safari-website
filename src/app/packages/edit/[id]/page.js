import EditPackageForm from "./EditPackageForm";

async function getPackage(id) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/custom-packages/get-package/${id}`,
        { cache: "no-store" }
    );
    if (!res.ok) return null;
    return res.json();
}

export default async function EditPackagePage({ params }) {
    const { id } = await params
    const pkg = await getPackage(id);

    if (!pkg) {
        return (
            <div className="container my-5">
                <div className="alert alert-danger">Package not found.</div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h1 className="fw-bold mb-4">Edit Package</h1>
            <EditPackageForm pkg={pkg} />
        </div>
    );
}
