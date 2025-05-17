export default function ProductLayout ({
    children,
}: {
    children: React.ReactNode;
}) {
    return(
    <div>
        {children}
        <div>
            <h2>Featred Products section</h2>
        </div>
    </div>

);
}