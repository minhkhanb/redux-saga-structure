export function withProperties<A, B>(component: A, properties: B): A & B {
  Object.keys(properties).forEach(key => {
    (component as Record<string, unknown>)[key] = (
      properties as Record<string, unknown>
    )[key];
  });
  return component as A & B;
}