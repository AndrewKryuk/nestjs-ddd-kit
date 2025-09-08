import { v4 as uuidv4 } from 'uuid';

export abstract class DomainEntity<T> {
  protected readonly _id?: string;
  protected props: T;

  constructor(props: T, id?: string) {
    this._id = id || uuidv4();

    this.props = props;
  }
}
