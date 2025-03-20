type HeadingProps = {
  title: string
  description?: string
  textStyles?: string
}

const Heading = ({ title, description, textStyles }: HeadingProps) => {
  return (
    <div className="space-y-4">
      <h1 className={`text-3xl font-bold text-center ${textStyles}`}>{title}</h1>
      <p className="text-muted-foreground text-center">{description}</p>
    </div>
  )
}

export { Heading }
