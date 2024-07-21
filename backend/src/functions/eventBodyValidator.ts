// eventBodyValidator.ts

export function eventBodyValidator(userOptions: any) {
  let result: any = {
    success: true,
    message: [],
  };
  if (!userOptions.ownerId) { result.message.push("Invalid ownerId.") }
  if (!userOptions.title) { result.message.push("Invalid title.") }
  if (!userOptions.description) { result.message.push("Invalid description.") }
  if (!userOptions.location) { result.message.push("Invalid location.") }
  if (!userOptions.startTime) { result.message.push("Invalid start time.") }
  if (!userOptions.endTime) { result.message.push("Invalid end time.") }
  if (result.message.length) { result.success = false }
  return result;
}
