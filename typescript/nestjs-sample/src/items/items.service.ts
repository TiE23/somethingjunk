import { Injectable } from '@nestjs/common';

import { Item } from './interfaces/item.interface';

// Generated with `nest generate service items`

// Allows us to inject this as a dependency in a constructor
@Injectable()
export class ItemsService {
  // Starting off with static data.
  private readonly items: Item[] = [
    {
      id: '1111111111',
      name: 'Example 1',
      description: 'Description 1',
      qty: 100,
    },
    {
      id: '2222222222',
      name: 'Example 2',
      description: 'Description 2',
      qty: 25,
    },
  ];

  findAll(): Item[] {
    return this.items;
  }
}
