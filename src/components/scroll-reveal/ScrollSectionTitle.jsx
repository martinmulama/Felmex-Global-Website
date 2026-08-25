export function ScrollSectionTitle({ as: Heading = 'h2', className = '', children, ...props }) {
  const titleClassName = ['section-title', className].filter(Boolean).join(' ');

  return (
    <div className="section-title-clip">
      <Heading className={titleClassName} {...props}>
        {children}
      </Heading>
    </div>
  );
}
