# IDA Notes

## How to remove joined data?

Removing a foreign key is simple enough, just clear a data field. But how to remove a join, i.e. an article tag?

1. Remove it from private field on class and then sync
2. Remove directly from database and then sync local private field

### UI and callback

1. Pass the remove callback into TagBadge somehow
2. Pass the remove button into the optional children snippet of TagBadge (cleaner)

## Misc

The distinction between schema- and instance- components is becoming more important. We know that list components are schema components since we don't want to instantiate every item in a list. However, the components that we might render through a list component then have a dilemma, which will lead to either separate schema- and instance- components that aren't lists, or polymorphic components which have to solve how they optionally render dot notation, since none of that will be valid.

1. We could settle for both schema- and instance- components. I don't want to do this.
2. We could work on a polymorphic solution. I like this idea, but it will take time to conceive and might not work.
3. We could simply add the remove functionality to the list component... the entire problem only exists for joins, and joins only exist for many-to-many relationships. Ergo, This problem will only ever manifest in a list context.

---

So, we have `removeTag` on the Article class.
We have `TagDelete.svelte` which receives a callback.

How do we link these two things together.

1. Could import `TagBadge` to `TagList`, and pass `TagDelete` in as children snippet if callback is present. But this assumes the only callback we want to pass is remove.
