import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { cryptoOptions as CRYPTO_OPTIONS, CryptoOption } from '../models/crypto-options';
import { SelectCrypto } from "./components/select-crypto/select-crypto";
import { SelectInvestorType } from "./components/select-investor-type/select-investor-type";
import { InvestorType as INVESTOR_TYPE, InvestorType } from '../models/investor-type';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectContent } from "./components/select-content/select-content";
import { ContentType as CONTENT_TYPE } from '../models/content-types';
import { CreateUserDataDto, UserManagerService } from '../services/user-manager.service';
import { UpdateUserDataDto } from '../models/updateUserData.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SelectCrypto,
    SelectInvestorType,
    MatRadioModule,
    ReactiveFormsModule,
    SelectContent
  ],
  templateUrl: './onboarding-page.html',
  styleUrl: './onboarding-page.scss',
})
export class OnboardingPage {

  // favoriteSeason: string = '';
  // seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  cryptoOptions: CryptoOption[] = CRYPTO_OPTIONS;
  selectedCryptos: string[] = [];
  investorTypes: string[] = INVESTOR_TYPE;
  selectedInvestorType: string | null = null;

  contentTypes: string[] = CONTENT_TYPE;
  selectedContentTypes: string[] = [];

  isLoading = false;


  constructor(private fb: FormBuilder, private userManagerService: UserManagerService, private router: Router) {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondFormGroup = this.fb.group({
      investorType: [null, Validators.required],
    });
    this.thirdFormGroup = this.fb.group({
      investorType: [null, Validators.required],
    });
  }

  toggleCrypto(option: CryptoOption): void {
    const index = this.selectedCryptos.indexOf(option.id);

    if (index !== -1) {
      this.selectedCryptos.splice(index, 1);
      return;
    }

    this.selectedCryptos.push(option.id);
  }

  toggleInvestorType(type: string): void {
    const nextValue = this.selectedInvestorType === type ? null : type;
    this.selectedInvestorType = nextValue;
    this.secondFormGroup.get('investorType')?.setValue(nextValue);
    this.secondFormGroup.markAsDirty();
    this.secondFormGroup.markAsTouched();
  }

  toggleContentType(contentType: string): void {
    console.log(contentType);

    const index = this.selectedContentTypes.indexOf(contentType);
    if (index !== -1) {
      this.selectedContentTypes.splice(index, 1);
      return;
    }
    this.selectedContentTypes.push(contentType);
    console.log(this.selectedContentTypes);
  }
  public submitNewUserData() {
    console.log("FINISH:");

    console.log(this.selectedCryptos);
    console.log(this.selectedInvestorType);
    console.log(this.selectedContentTypes);
    const payload: UpdateUserDataDto = {
      assets: this.selectedCryptos,
      investorType: this.selectedInvestorType,
      contentType: this.selectedContentTypes
    };
    console.log(payload);
    console.log(this.userManagerService.currentUserData._id);

    this.userManagerService.updateUserData(this.userManagerService.currentUserData._id, payload).subscribe({
      next: (res) => {
        console.log('updated:', res)
        localStorage.setItem('currentUserData', JSON.stringify(res));
        this.userManagerService.currentUserData = res;
        console.log(res);

      },
      error: (err) => { console.error('Create failed:', err) }
    });




  }

  // Final Submission Logic
  async finishSetup() {
    await this.submitNewUserData();
    this.isLoading = true;

    // Simulate API call to save user preferences
    setTimeout(() => {
      console.log('User Data Submitted', {
        cryptos: this.selectedCryptos,
        type: this.selectedInvestorType,
        content: this.selectedContentTypes
      });

      this.router.navigate(['/dashboards']);
    }, 2000);
  }
}
