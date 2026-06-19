type JsonLdProps = {
  data: ReadonlyArray<Record<string, unknown>>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <>
      {data.map((schema, index) => {
        const schemaRecord = schema as Record<string, unknown> & {
          "@id"?: string;
        };
        const key =
          typeof schemaRecord["@id"] === "string"
            ? schemaRecord["@id"]
            : `jsonld-${index}`;
        return (
          <script
            key={key}
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            type="application/ld+json"
          />
        );
      })}
    </>
  );
}
