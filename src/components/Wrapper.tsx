const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="pb-14 max-w-5xl mx-auto px-6 pt-6 lg:px-8">{children}</div>
    );
};

export default Wrapper;
