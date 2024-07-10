import { Module } from '@nestjs/common';

import { AppCommonModule } from './common.module.app';
import { AuthModule } from './modules/auth/auth.module';
import { DebtsModule } from './modules/debts/debts.module';
import { UsersModule } from './modules/users/users.module';
import { NotesModule } from './modules/notes/notes.module';
import { CommonModule } from './modules/common/common.module';
import { IncomesModule } from './modules/incomes/incomes.module';
import { MyDebtsModule } from './modules/my.debts/my.debts.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { PrepaymentModule } from './modules/prepayment/prepayment.module';
import { ExpenCategoriesModule } from './modules/expen.categories/expen.categories.module';
import { NotesCategoriesModule } from './modules/notes.categories/notes.categories.module';
import { DocumentCategoriesModule } from './modules/document.categories/document.categories.module';
import { ExpenSubCategoriesModule } from './modules/expen.sub.categories/expen.sub.categories.module';
import { NotesSubCategoriesModule } from './modules/notes.sub.categories/notes.sub.categories.module';
import { DocumentSubCategoriesModule } from './modules/document.sub.categories/document.sub.categories.module';

@Module({
  imports: [
    AppCommonModule,
    CommonModule,
    AuthModule,
    UsersModule,
    ExpenCategoriesModule,
    ExpenSubCategoriesModule,
    ExpensesModule,
    DebtsModule,
    MyDebtsModule,
    DocumentCategoriesModule,
    DocumentSubCategoriesModule,
    DocumentsModule,
    NotesModule,
    NotesCategoriesModule,
    NotesSubCategoriesModule,
    PrepaymentModule,
    IncomesModule,
  ],
})
export class AppModule {}
